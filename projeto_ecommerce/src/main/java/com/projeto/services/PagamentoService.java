package com.projeto.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.model.Pagamento;
import com.projeto.repositories.RepoPagamento;

@Service
public class PagamentoService {
	
	 @Autowired
	    private RepoPagamento pagamentoRepo;

	    public List<Pagamento> listarTodos() {
	        return pagamentoRepo.findAll();
	    }

	    public Optional<Pagamento> buscarPorId(Integer id) {
	        return pagamentoRepo.findById(id);
	    }

	    public Pagamento salvar(Pagamento pagamento) {
	        return pagamentoRepo.save(pagamento);
	    }

	    public void deletar(Integer id) {
	        pagamentoRepo.deleteById(id);
	    }
}
