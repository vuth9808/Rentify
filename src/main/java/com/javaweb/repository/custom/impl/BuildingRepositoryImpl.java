package com.javaweb.repository.custom.impl;


import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.javaweb.entity.BuildingEntity;
import com.javaweb.model.response.BuildingSearchResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.repository.custom.BuildingRepositoryCustom;
import com.javaweb.utils.StringUtils;

@Repository
public class BuildingRepositoryImpl implements BuildingRepositoryCustom{
    @PersistenceContext
    private EntityManager entityManager;

    public static void joinExecute(BuildingSearchBuilder buildingSearchBuilder, StringBuilder sql) {
        Long staffId = buildingSearchBuilder.getStaffId();
        if (staffId != null) {
            sql.append(" INNER JOIN assignmentbuilding ON b.id = assignmentbuilding.buildingid ");
        }
    }

    public static void queryNormal(BuildingSearchBuilder buildingSearchBuilder, StringBuilder where) {
        try {
            Field[] fields = BuildingSearchBuilder.class.getDeclaredFields();
            for (Field item : fields) {
                item.setAccessible(true);
                String fieldName = item.getName();
                if (!fieldName.equals("staffId") && !fieldName.startsWith("area") && !fieldName.startsWith("rentPrice")
                        && !fieldName.equals("managerPhoneNumber") && !fieldName.equals("district")) {
                    Object value = item.get(buildingSearchBuilder);
                    if (value != null) {
                        if (item.getType().getName().equals("java.lang.Long") || item.getType().getName().equals("java.lang.Integer")) {
                            where.append(" AND b." + fieldName + " = " + value);
                        } else if(item.getType().getName().equals("java.lang.String")){
                            where.append(" AND b." + fieldName + " LIKE '%" + value + "%' ");
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void querySpecial(BuildingSearchBuilder buildingSearchBuilder, StringBuilder where) {
        Long staffId = buildingSearchBuilder.getStaffId();
        if (staffId != null) {
            where.append(" AND assignmentbuilding.staffId = " + staffId);
        }
        Long rentAreaTo = buildingSearchBuilder.getAreaTo();
        Long rentAreaFrom = buildingSearchBuilder.getAreaFrom();
        if (rentAreaFrom != null || rentAreaTo != null) {
            where.append(" AND EXISTS (SELECT * FROM rentarea r WHERE b.id = r.buildingid ");
            if (rentAreaFrom != null) {
                where.append(" AND r.value >= " + rentAreaFrom);
            }
            if (rentAreaTo != null) {
                where.append(" AND r.value <= " + rentAreaTo);
            }
            where.append(") ");
        }
        Long rentPriceTo = buildingSearchBuilder.getRentPriceTo();
        Long rentPriceFrom = buildingSearchBuilder.getRentPriceFrom();
        if (rentPriceFrom != null || rentPriceTo != null) {
            if (rentPriceFrom != null) {
                where.append(" AND b.rentprice >= " + rentPriceFrom);
            }
            if (rentPriceTo != null) {
                where.append(" AND b.rentprice <= " + rentPriceTo);
            }
        }
        List<String> typeCode = buildingSearchBuilder.getTypeCode();
        if (typeCode != null && typeCode.size() != 0) {
            where.append(" AND(");
            String sql = typeCode.stream().map(it -> "type LIKE" + "'%" + it + "%' ")
                    .collect(Collectors.joining(" OR "));
            where.append(sql);
            where.append(" ) ");
        }

        String managerPhoneNumber = buildingSearchBuilder.getManagerPhoneNumber();
        if (StringUtils.check(managerPhoneNumber)) {
            where.append(" AND b.managerphone = '" + managerPhoneNumber + "' ");
        }

        String district = buildingSearchBuilder.getDistrict();
        if (StringUtils.check(district)) {
            where.append(" AND b.district = '" + district + "' ");
        }

    }

    public static void groupByQuery(BuildingSearchBuilder buildingSearchBuilder, StringBuilder where) {
        where.append(" group by b.id ");
        if (buildingSearchBuilder.getStaffId() != null) {
            where.append(", assignmentbuilding.id ");
        }
    }


    @Override
    public List<BuildingEntity> findAll(BuildingSearchBuilder buildingSearchBuilder, Pageable pageable) {
        StringBuilder sql = new StringBuilder(
                "select * from building b "
                // "Select b.name, b.street, b.ward, b.numberofbasement, b.id, b.district, "
                // + " b.managername, b.managerphone, b.floorarea, b.rentprice, b.servicefee, b.brokeragefee "
                // + " from building b "
        );

        StringBuilder where = new StringBuilder(" where 1 = 1 ");

        joinExecute(buildingSearchBuilder, sql);
        queryNormal(buildingSearchBuilder, where);
        querySpecial(buildingSearchBuilder, where);
        groupByQuery(buildingSearchBuilder, where);
        // splitPage(pageable, where); // Uncomment nếu bạn muốn phân trang thủ công

        sql.append(where);

        Query query = entityManager.createNativeQuery(sql.toString(), BuildingEntity.class);
        return query.getResultList();
    }

    @Override
    public int countTotalItem(BuildingSearchResponse buildingSearchResponse) {
        String sql = buildQueryFilter(buildingSearchResponse.getId());
        Query query = entityManager.createNativeQuery(sql);
        return query.getResultList().size();
    }

    private String buildQueryFilter(Long id) {
        String sql = "SELECT * FROM building b WHERE b.id = " + id;
        return sql;
    }

    public void splitPage(Pageable pageable, StringBuilder where)
    {
        where.append(" LIMIT ").append(pageable.getPageSize()).append("\n")
                .append(" OFFSET ").append(pageable.getOffset());
    }

}
