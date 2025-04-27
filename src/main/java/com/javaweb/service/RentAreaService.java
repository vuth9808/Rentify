package com.javaweb.service;

import com.javaweb.model.dto.BuildingDTO;

import java.util.List;

public interface RentAreaService {
    public void deleteByBuildings(List<Long> ids);
//    public void addRentArea(BuildingDTO buildingDTO);
}
