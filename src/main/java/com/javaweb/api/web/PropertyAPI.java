package com.javaweb.api.web;

import com.javaweb.entity.BuildingEntity;
import com.javaweb.service.IBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyAPI {
    
    @Autowired
    private IBuildingService buildingService;
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllProperties() {
        List<BuildingEntity> buildings = buildingService.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (BuildingEntity building : buildings) {
            Map<String, Object> property = new HashMap<>();
            property.put("id", building.getId());
            property.put("title", building.getName());
            property.put("description", building.getNote());
            property.put("price", building.getRentPrice());
            property.put("address", building.getStreet());
            property.put("district", building.getDistrict());
            property.put("ward", building.getWard());
            property.put("area", building.getFloorArea());
            property.put("image", building.getImage());
            
            result.add(property);
        }
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPropertyById(@PathVariable Long id) {
        BuildingEntity building = buildingService.findById(id);
        
        if (building == null) {
            return ResponseEntity.notFound().build();
        }
        
        Map<String, Object> property = new HashMap<>();
        property.put("id", building.getId());
        property.put("title", building.getName());
        property.put("description", building.getNote());
        property.put("price", building.getRentPrice());
        property.put("address", building.getStreet());
        property.put("district", building.getDistrict());
        property.put("ward", building.getWard());
        property.put("area", building.getFloorArea());
        property.put("direction", building.getDirection());
        property.put("structure", building.getStructure());
        property.put("numberOfBasement", building.getNumberOfBasement());
        property.put("serviceFee", building.getServiceFee());
        property.put("carFee", building.getCarFee());
        property.put("motoFee", building.getMotoFee());
        property.put("waterFee", building.getWaterFee());
        property.put("electricFee", building.getElectricFee());
        property.put("deposit", building.getDeposit());
        property.put("payment", building.getPayment());
        property.put("rentTime", building.getRentTime());
        property.put("managerName", building.getManagerName());
        property.put("managerPhone", building.getManagerPhone());
        property.put("image", building.getImage());
        
        return ResponseEntity.ok(property);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Map<String, Object>>> getFeaturedProperties() {
        // Trong thực tế, bạn sẽ thêm logic để lấy các BĐS nổi bật
        // Ở đây chúng ta chỉ lấy 6 BĐS đầu tiên
        List<BuildingEntity> buildings = buildingService.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        
        int count = 0;
        for (BuildingEntity building : buildings) {
            if (count >= 6) break;
            
            Map<String, Object> property = new HashMap<>();
            property.put("id", building.getId());
            property.put("title", building.getName());
            property.put("description", building.getNote());
            property.put("price", building.getRentPrice());
            property.put("address", building.getStreet());
            property.put("district", building.getDistrict());
            property.put("ward", building.getWard());
            property.put("area", building.getFloorArea());
            property.put("image", building.getImage());
            
            result.add(property);
            count++;
        }
        
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchProperties(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Long minArea,
            @RequestParam(required = false) Long maxArea) {
        
        // Trong thực tế, bạn sẽ thêm logic tìm kiếm theo các tiêu chí
        // Ở đây chúng ta chỉ mô phỏng bằng cách lọc danh sách
        List<BuildingEntity> buildings = buildingService.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (BuildingEntity building : buildings) {
            // Lọc theo quận/huyện
            if (district != null && !district.isEmpty() && !building.getDistrict().equals(district)) {
                continue;
            }
            
            // Lọc theo giá
            if (minPrice != null && building.getRentPrice() < minPrice) {
                continue;
            }
            if (maxPrice != null && building.getRentPrice() > maxPrice) {
                continue;
            }
            
            // Lọc theo diện tích
            if (minArea != null && building.getFloorArea() < minArea) {
                continue;
            }
            if (maxArea != null && building.getFloorArea() > maxArea) {
                continue;
            }
            
            Map<String, Object> property = new HashMap<>();
            property.put("id", building.getId());
            property.put("title", building.getName());
            property.put("description", building.getNote());
            property.put("price", building.getRentPrice());
            property.put("address", building.getStreet());
            property.put("district", building.getDistrict());
            property.put("ward", building.getWard());
            property.put("area", building.getFloorArea());
            property.put("image", building.getImage());
            
            result.add(property);
        }
        
        return ResponseEntity.ok(result);
    }
} 