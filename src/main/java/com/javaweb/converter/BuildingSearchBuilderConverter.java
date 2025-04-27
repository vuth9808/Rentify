package com.javaweb.converter;

import java.util.List;
import java.util.Map;

import com.javaweb.model.request.BuildingSearchRequest;
import org.springframework.stereotype.Component;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.utils.MapUtils;


@Component
public class BuildingSearchBuilderConverter {
    public BuildingSearchBuilder toBuildingSearchBuilder(BuildingSearchRequest buildingSearchRequest, List<String> typeCode) {
        BuildingSearchBuilder buildingSearchBuilder = new BuildingSearchBuilder.Builder()
                .setName(MapUtils.getObject(buildingSearchRequest.getName(), String.class))
                .setFloorArea(MapUtils.getObject(buildingSearchRequest.getFloorArea(), Long.class))
                .setWard(MapUtils.getObject(buildingSearchRequest.getWard(), String.class))
                .setStreet(MapUtils.getObject(buildingSearchRequest.getStreet(), String.class))
                .setDistrict(MapUtils.getObject(buildingSearchRequest.getDistrict(), String.class))
                .setNumberOfBasement(MapUtils.getObject(buildingSearchRequest.getNumberOfBasement(), Integer.class))
                .setTypeCode(typeCode)
                .setManagerName(MapUtils.getObject(buildingSearchRequest.getManagerName(), String.class))
                .setManagerPhoneNumber(MapUtils.getObject(buildingSearchRequest.getManagerPhone(), String.class))
                .setRentPriceTo(MapUtils.getObject(buildingSearchRequest.getRentPriceTo(), Long.class))
                .setRentPriceFrom(MapUtils.getObject(buildingSearchRequest.getRentPriceFrom(), Long.class))
                .setAreaFrom(MapUtils.getObject(buildingSearchRequest.getAreaFrom(), Long.class))
                .setAreaTo(MapUtils.getObject(buildingSearchRequest.getAreaTo(), Long.class))
                .setStaffId(MapUtils.getObject(buildingSearchRequest.getStaffId(), Long.class))
                .build();

        return buildingSearchBuilder;
    }
}
