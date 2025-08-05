package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.product.ProductDto;
import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();
    List<ProductDto> getAllActiveProducts();
    ProductDto getProductById(Long id);
    ProductDto createProduct(ProductDto productDto);
    ProductDto updateProduct(Long id, ProductDto productDto);
    void deleteProduct(Long id);
    List<ProductDto> searchProducts(String name, String description, Double minPrice, Double maxPrice);
}