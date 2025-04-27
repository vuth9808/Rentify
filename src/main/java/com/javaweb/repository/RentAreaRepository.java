package com.javaweb.repository;

import com.javaweb.entity.BuildingEntity;
import com.javaweb.entity.RentAreaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RentAreaRepository extends JpaRepository<RentAreaEntity,Long> {
    void deleteByBuilding(BuildingEntity buildingEntity);
    @Transactional
    void deleteByBuilding_IdIn(List<Long> ids);
}
