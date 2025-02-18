package com.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Venda;

@Repository
public interface VendaRepo extends JpaRepository<Venda, Integer> {

}
