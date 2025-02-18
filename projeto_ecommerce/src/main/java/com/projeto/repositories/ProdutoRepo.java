package com.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Produto;

@Repository
public interface ProdutoRepo extends JpaRepository<Produto, Integer>{

}
