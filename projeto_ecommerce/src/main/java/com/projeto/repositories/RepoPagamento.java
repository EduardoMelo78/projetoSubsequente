package com.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Pagamento;

@Repository
public interface RepoPagamento extends JpaRepository<Pagamento, Integer> {
	
}
