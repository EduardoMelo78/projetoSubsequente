package com.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.model.Endereco;
import com.projeto.services.EnderecoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("enderecos")

public class EnderecoController {
	
		@Autowired
		EnderecoService service;
		
		@GetMapping("")
		public List<Endereco> listar(){
			return service.listarTodos();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Endereco> localizar (@PathVariable int id){
			return service.buscarPorId(id)
					.map(ResponseEntity::ok)
					.orElse(ResponseEntity.notFound().build());
		}
		
		@PostMapping("")
		public Endereco salvar(@RequestBody Endereco endereco) {
			return service.salvar(endereco);
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Endereco> atualizar(@PathVariable int id, @RequestBody Endereco endereco){
			return service.buscarPorId(id)
					.map(existente ->{
						endereco.setId(existente.getId());
						service.salvar(endereco);
						return ResponseEntity.ok(endereco);
					}).orElse(ResponseEntity.notFound().build());
		}
		
		@DeleteMapping("/{id}")
		public String deletar (@PathVariable int id){
			service.deletar(id);
			return "Endereco de Id: " + id + " deletado com Sucesso";
		}
		
}
