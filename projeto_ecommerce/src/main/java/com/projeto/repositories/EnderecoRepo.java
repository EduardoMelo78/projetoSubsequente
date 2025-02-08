package com.projeto.repositories;

import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Endereco;
import com.projeto.model.Pagamento;

@Repository
public interface EnderecoRepo extends JpaRepository<Endereco, Integer> {

}
