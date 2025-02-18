package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Departamento;
import com.projeto.repositories.DepartamentoRepo;

@Service
public class DepartamentoService {

		@Autowired
		DepartamentoRepo repo;
		
		public List<Departamento> listarTodos(){
			return repo.findAll();		}
		
		public Optional<Departamento> buscarPorId(int id){
			return repo.findById(id);
		}
		
		public  Departamento salvar(Departamento departamento) {
			return repo.save(departamento);
		}
		
		public void deletar(int id) {
			 repo.deleteById(id);
		}
		
}
