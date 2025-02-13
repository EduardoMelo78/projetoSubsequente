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

import com.projeto.model.Usuario;
import com.projeto.services.UsuarioService;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

		@Autowired
		UsuarioService service;
		
		@PostMapping
		public Usuario salvar(@RequestBody Usuario usuario) {
			return service.salvar(usuario);
		}
		
		@GetMapping("")
		public List<Usuario> listar(){
			return service.listarTodos();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Usuario> localizar(@PathVariable int id){
			return service.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Usuario> atualizar(@PathVariable int id, @RequestBody Usuario usuario){
			return 
					service.buscarPorId(id)
					.map(existente -> {
						usuario.setId(existente.getId());
						service.salvar(usuario);
						return ResponseEntity.ok(usuario);
						}).orElse(ResponseEntity.notFound().build());
		}
		
		@DeleteMapping ("/{id}")
		public String deletar(@PathVariable int id) {
			service.deletar(id);
			return "Usuario de ID: " + id + ", deletado com sucesso";
		}
		
		
		
		
		
							
}

