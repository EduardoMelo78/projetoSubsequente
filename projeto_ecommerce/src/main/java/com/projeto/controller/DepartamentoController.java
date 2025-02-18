package com.projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.model.Departamento;
import com.projeto.services.DepartamentoService;

@RestController
@RequestMapping("departamentos")
public class DepartamentoController {
	
		@Autowired
		DepartamentoService service;
		
		@GetMapping("")
		public List<Departamento> listar (){
			return service.listarTodos();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Departamento> localizar(@PathVariable int id){
			return service.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
		}
		
		@PostMapping("")
		public Departamento salvar(@RequestBody Departamento departamento) {
			return service.salvar(departamento);
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Departamento> atualizar (@PathVariable int id, @RequestBody Departamento departamento){
			return service.buscarPorId(id).map(existente -> 
			{departamento.setId(existente.getId());
			service.salvar(departamento);
			return ResponseEntity.ok(departamento);
			}).orElse(ResponseEntity.notFound().build());
		}
		
		@DeleteMapping("/{id}")
		public String deletar (@PathVariable int id) {
			service.deletar(id);
			return "Departamento de ID: " + id + " foi deletado com sucesso";
		}
		
}
