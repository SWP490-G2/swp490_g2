package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.*;
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

    private ProductStatusRepository productStatusRepository;

    @Autowired
    public void setProductStatusRepository(ProductStatusRepository productStatusRepository) {
        this.productStatusRepository = productStatusRepository;
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

    public void addNewProduct(ProductInformationRequest productInformationRequest, MultipartFile[] images) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || !currentUser.isSeller() || !currentUser.isAdmin()) {
            throw new AccessDeniedException("This request allows seller or admin only!");
        }

        Restaurant ownerRestaurant = restaurantRepository.getOwnerRestaurant(currentUser.getId()).orElse(null);
        ProductStatus productStatus = productStatusRepository.findById(productInformationRequest.getProductStatusId()).orElse(null);
        Set<ProductCategory> requestCategories = new HashSet<>();
        for (ProductCategory productCategory : productInformationRequest.getProductCategories()) {
            ProductCategory category = productCategoryRepository.findById(productCategory.getId()).orElse(null);
            requestCategories.add(category);
        }
        if ((ownerRestaurant != null) && (currentUser.isSeller()) || currentUser.isAdmin()) {
            Set<File> productImages = new HashSet<>();
            for (MultipartFile imageFile : images) {
                if (imageFile.getContentType().equalsIgnoreCase("image/png")) {
                    File file = productImage(currentUser, imageFile);
                    productImages.add(file);
                }
            }
            Product product = new Product();
            product.setProductName(productInformationRequest.getProductName());
            product.setPrice(productInformationRequest.getPrice());
            product.setQuantity(productInformationRequest.getQuantity());
            product.setDescription(productInformationRequest.getDescription());
//            product.setRestaurant(ownerRestaurant);
//            product.setProductStatus(productStatus);
//            product.setFiles(productImages);
            product.setCategories(requestCategories);
            productRepository.save(product);
        }
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

    public void deleteProductById(Long productId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || !currentUser.isSeller() || !currentUser.isAdmin()) {
            throw new AccessDeniedException("This request allows seller or admin only!");
        }
        List<ProductCategory> getAllCategoriesByProductId = productCategoryRepository.getAllCategoriesByProductId(productId);
        for (ProductCategory productCategory : getAllCategoriesByProductId) {
            productRepository.deleteProductProductCategory(productId, productCategory.getId());
        }
        Product product = productRepository.getById(productId);
        productRepository.delete(product);
    }


    public void update(Product product) {
        if (product == null)
            return;

        productRepository.save(product);
    }
}
