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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Getter
public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ProductStatusRepository productStatusRepository;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
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

    public File productImage(User user, MultipartFile imageFile){
        String path = fileService.save(imageFile, "product", "image");
        File productImage = File.builder()
                .filePath(path)
                .build();
        productImage.setCreatedBy(user.getId());
        productImage.setModifiedBy(user.getId());
        return productImage;
    }

    public void addNewProduct(ProductInformationRequest productInformationRequest, MultipartFile[] images){
        User currentUser = userService.getCurrentUser();
        if(currentUser == null || !currentUser.isSeller() || !currentUser.isAdmin()){
            return;
        }
        Restaurant ownerRestaurant = restaurantRepository.getOwnerRestaurant(currentUser.getId()).orElse(null);
        ProductStatus productStatus = productStatusRepository.findById(productInformationRequest.getProductStatusId()).orElse(null);
        Set<ProductCategory> requestCategories = new HashSet<>();
        for (ProductCategory productCategory: productInformationRequest.getProductCategories()) {
            ProductCategory category = productCategoryRepository.findById(productCategory.getId()).orElse(null);
            requestCategories.add(category);
        }
        if((ownerRestaurant != null) && (currentUser.isSeller()) || currentUser.isAdmin()){
            Set<File> productImages = new HashSet<>();
            for(MultipartFile imageFile: images){
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
            product.setRestaurant(ownerRestaurant);
            product.setProductStatus(productStatus);
            product.setFiles(productImages);
            product.setCategories(requestCategories);
            productRepository.save(product);
        }
    }

    public void deleteProductById(Long productId){


    }




}
