package com.javaweb.service;

import com.javaweb.model.dto.AssignmentBuildingDTO;
import com.javaweb.model.dto.BuildingDTO;
import com.javaweb.model.request.BuildingSearchRequest;
import com.javaweb.model.response.BuildingSearchResponse;
import com.javaweb.model.response.ResponseDTO;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface BuildingService {
    public List<BuildingSearchResponse> findAll (BuildingSearchRequest buildingSearchRequest, Pageable pageable);
    public void deleteBuildings(List<Long> ids);
    public BuildingDTO addOrUpdateBuilding(BuildingDTO buildingDTO);
    public BuildingDTO findById(Long id);
    ResponseDTO listStaffs(Long buildingId);
    public int countTotalItem(List<BuildingSearchResponse> list);
    public AssignmentBuildingDTO addAssignmentBuildingEntity(AssignmentBuildingDTO assignmentBuildingDTO);
}
