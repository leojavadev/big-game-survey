package com.leojavadev.survey.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leojavadev.survey.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long>{

}