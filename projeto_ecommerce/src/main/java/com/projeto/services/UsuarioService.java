package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Usuario;
import com.projeto.repositories.UsuarioRepo;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepo repo;
	
		public List<Usuario> listarTodos(){
			return repo.findAll();
		}
		
		public Optional<Usuario> buscarPorId(int id){
			return repo.findById(id);
		}
		
		public Usuario salvar (Usuario usuario) {
			return repo.save(usuario);
		}
		
		public void deletar (int id) {
			repo.deleteById(id);
		}
		
}
