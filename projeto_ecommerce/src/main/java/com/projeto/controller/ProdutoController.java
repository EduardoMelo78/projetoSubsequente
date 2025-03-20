package com.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.model.Produto;
import com.projeto.services.ProdutoService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("produtos")
public class ProdutoController {
	
	@Autowired
	ProdutoService service;
	
	
	@GetMapping ("")
	public List<Produto> listar(){
		return service.listarTodos();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Produto> localizar(@PathVariable int id){
		return service.buscarPorId(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("")
	public Produto salvar(@RequestBody Produto produto) {
		return service.salvar(produto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Produto> atualizar(@PathVariable int id, @RequestBody Produto produto) {
		
		return service.buscarPorId(id)
				.map(existente -> {
					produto.setId(existente.getId());
					service.salvar(produto);
					return ResponseEntity.ok(produto);
				})
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public String deletar(@PathVariable int id) {
		service.deletar(id);
		return "Produto de ID: " + id +" deletado com sucesso";
	}
}
