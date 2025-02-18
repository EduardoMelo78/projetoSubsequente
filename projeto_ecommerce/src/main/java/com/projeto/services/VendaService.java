package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Venda;
import com.projeto.repositories.VendaRepo;

@Service
public class VendaService {
	
	@Autowired
	VendaRepo repo;
	
	public List<Venda> listarTodos(){
		return repo.findAll();
		}

	public Optional<Venda> buscarPorId(int id){
		return repo.findById(id);
	}
	
	public Venda salvar (Venda venda) {
		return repo.save(venda);
	}
	
	public void deletar (int id) {
		repo.deleteById(id);
	}
}
