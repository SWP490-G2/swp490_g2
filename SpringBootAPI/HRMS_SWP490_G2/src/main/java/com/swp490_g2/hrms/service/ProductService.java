package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.enums.ProductStatus;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.*;
import com.swp490_g2.hrms.requests.ProductInformationRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Getter
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private FileService fileService;

    @Autowired
    public void setFileRepository(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private RestaurantRepository restaurantRepository;

    @Autowired
    public void setRestaurantRepository(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    private FileRepository fileRepository;

    @Autowired
    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }

    private RestaurantService restaurantService;

    @Autowired
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    public void setProductCategoryRepository(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public Page<Product> search(SearchRequest request) {
        SearchSpecification<Product> specification = new SearchSpecification<>(request);
        Pageable pageable = SearchSpecification.getPageable(request.getPage(), request.getSize());
        return productRepository.findAll(specification, pageable);
    }

    public Double[] getProductPriceRanges(Long restaurantId) {
        Double[] result = new Double[]{0.0, 0.0};
        result[0] = productRepository.getMinPriceByRestaurantId(restaurantId);
        result[1] = productRepository.getMaxPriceByRestaurantId(restaurantId);
        return result;
    }

    public Set<Product> fulltextSearch(Long restaurantId, String text) {
        return productRepository.fulltextSearch(restaurantId, text);
    }

    public File productImage(User user, MultipartFile imageFile) {
        String path = fileService.save(imageFile, "product", "image");
        File productImage = File.builder()
                .filePath(path)
                .build();
        productImage.setCreatedBy(user.getId());
        productImage.setModifiedBy(user.getId());
        return productImage;
    }

    private void checkValidUserForRestaurant(Long restaurantId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            throw new AccessDeniedException("This request allows seller or admin only.");
        }

        Restaurant ownerRestaurant = restaurantRepository.getOwnerRestaurant(currentUser.getId(), restaurantId).orElse(null);
        if (!currentUser.isAdmin() && (currentUser.isSeller() && ownerRestaurant == null)) {
            throw new AccessDeniedException("This request allows seller or admin only.");
        }
    }

    public String addNewProduct(Long restaurantId, Product product) {
        checkValidUserForRestaurant(restaurantId);

        Restaurant restaurant = restaurantService.getById(restaurantId);
        if (restaurant == null) {
            return "\"This restaurant with id [" + restaurantId + "] does not exist.\"";
        }
        boolean hasSameProductName = restaurant.getProducts().stream().anyMatch(p -> p.getProductName().equals(product.getProductName()));
        if (hasSameProductName) {
            return "\"This product with name [" + product.getProductName() + "] is already existed.\"";
        }
        restaurant.getProducts().add(product);
        restaurantService.update(restaurant);

        return null;
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void addImage(Long productId, MultipartFile imageFile) {
        Product product = getById(productId);
        if (product == null)
            return;

        String path = fileService.save(imageFile, "product", productId.toString());
        File productImage = File.builder()
                .filePath(path)
                .build();

        User user = userService.getCurrentUser();
        productImage.setCreatedBy(user.getId());
        product.getImages().add(productImage);
        update(product);
    }

    @Transactional
    public void deleteProductById(Long restaurantId, Long productId) {
        checkValidUserForRestaurant(restaurantId);

        List<ProductCategory> getAllCategoriesByProductId = productCategoryRepository.getAllCategoriesByProductId(productId);
        for (ProductCategory productCategory : getAllCategoriesByProductId) {
            productRepository.deleteProductProductCategory(productId, productCategory.getId());
        }

        Restaurant restaurant = restaurantService.getById(restaurantId);
        if (restaurant != null) {
            restaurant.getProducts().removeIf(p -> p.getId().equals(productId));
            restaurantService.update(restaurant);
        }
        
        productRepository.deleteById(productId);
    }

    public void update(Product product) {
        if (product == null)
            return;
        productRepository.save(product);
    }
}
