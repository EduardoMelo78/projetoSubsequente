package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Produto;
import com.projeto.repositories.ProdutoRepo;

@Service
public class ProdutoService {

	@Autowired
	ProdutoRepo repo;
	
	public List<Produto> listarTodos(){
		return repo.findAll();
		}
	
	public Optional<Produto> buscarPorId(int id){
		return repo.findById(id);
	}
	
	public Produto salvar(Produto produto) {
		return repo.save(produto);
	}
	
	public void deletar (int id) {
		repo.deleteById(id);
	}
	
}
