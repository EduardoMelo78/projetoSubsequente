package com.projeto.model;

public enum TipoPagamento {
	ESPECIE ("Espécie"),
	PIX("Pix"),
	CARTAO ("Cartão");
	
	private String descricao;
	
	TipoPagamento(String descricao) {
	    this.descricao = descricao;
	}
	
	public String getDescricao() {
	    return descricao;
	}
	
}
