package com.projeto.model;

public enum Status {
	PROCESSANDO ("Processando"),
	FINALIZADO ("Finalizado"),
	CANCELADO ("Cancelado");
	
	private String descricao;
	
	 Status(String descricao) {
	        this.descricao = descricao;
	    }
	 
	 public String getDescricao() {
	        return descricao;
	    }
	
}
