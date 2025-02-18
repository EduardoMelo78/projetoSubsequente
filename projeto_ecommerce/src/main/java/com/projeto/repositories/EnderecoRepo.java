package com.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Endereco;

@Repository
public interface EnderecoRepo extends JpaRepository<Endereco, Integer> {

}
