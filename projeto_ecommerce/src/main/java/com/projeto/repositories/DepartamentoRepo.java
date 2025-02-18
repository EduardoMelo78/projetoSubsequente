package com.projeto.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Departamento;

@Repository
public interface DepartamentoRepo extends JpaRepository<Departamento, Integer>{

}
