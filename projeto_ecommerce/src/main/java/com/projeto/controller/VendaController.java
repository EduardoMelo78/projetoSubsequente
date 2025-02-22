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

import com.projeto.model.Venda;
import com.projeto.services.VendaService;

@RestController
@RequestMapping("vendas")
public class VendaController {

	@Autowired
	VendaService service;
	
	@GetMapping("")
	public List<Venda> listarTodos(){
		return service.listarTodos();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Venda> localizar(@PathVariable int id){
		return service.buscarPorId(id)
				.map(ResponseEntity ::ok)
				.orElse(ResponseEntity.notFound().build());		
	}
	
	@PostMapping("")
	public Venda salvar(@RequestBody Venda venda) {
		return service.salvar(venda);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Venda> atualizar(@PathVariable int id, @RequestBody Venda venda){
		return service.buscarPorId(id)
		.map(existente -> {
			venda.setId(existente.getId());
			service.salvar(venda);
			return ResponseEntity.ok(venda);
		})
		.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public String deletar(@PathVariable int id) {
		service.deletar(id);
		return "Venda de ID: " + id + " deletado com sucesso";
	}
	
	
}
