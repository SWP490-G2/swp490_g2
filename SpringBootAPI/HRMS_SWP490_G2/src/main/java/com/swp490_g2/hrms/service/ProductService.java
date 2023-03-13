package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.ProductRepository;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Getter
public class ProductService {
    private ProductRepository productRepository;

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

    public Set<Product> fulltextSearch(String text) {
        return productRepository.fulltextSearch(text);
    }
}
