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

import com.projeto.model.Pagamento;
import com.projeto.repositories.RepoPagamento;
import com.projeto.services.PagamentoService;

@RestController
@RequestMapping ("pagamentos")
public class PagamentoController {
	
	@Autowired
	PagamentoService service;
	
	@GetMapping("")
	public List<Pagamento> listar() {
		return service.listarTodos();
	}
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Pagamento> localizar(@PathVariable int id) {
		
		return service.buscarPorId(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("")
	public Pagamento salvar(@RequestBody Pagamento p) {
		return service.salvar(p);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Pagamento> atualizar(@PathVariable Integer id, @RequestBody Pagamento p ) {
		return service.buscarPorId(id)
				.map(existente -> {
					p.setId(existente.getId());
					service.salvar(p);
					return ResponseEntity.ok(p);
					})
				.orElse(ResponseEntity.notFound().build());
	}
	
	
	@DeleteMapping("/{id}")
	public String deletar(@PathVariable int id) {
		service.deletar(id);
		return "Pagamento de id: "+ id +" deletado com sucesso";
	}
}
