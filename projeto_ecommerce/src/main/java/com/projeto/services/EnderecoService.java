package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Endereco;
import com.projeto.repositories.EnderecoRepo;

@Service
public class EnderecoService {
	
	@Autowired
	private EnderecoRepo repo;
	
	public List<Endereco> listarTodos(){
		return repo.findAll();
	}
	
	public Optional<Endereco> buscarPorId (int id){
		return repo.findById(id);
	}
	
	public Endereco salvar(Endereco endereco) {
		return repo.save(endereco);
	}
	
	public void deletar (int id){
		repo.deleteById(id);
	} 
	
	
}
