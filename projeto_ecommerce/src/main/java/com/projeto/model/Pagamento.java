package com.projeto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity


public class Pagamento {
		
		@Id
		@GeneratedValue (strategy = GenerationType.IDENTITY)
		private int id;
		private Double valorReais;
		private int valorPontos;
		
		@Enumerated(EnumType.STRING)
	    private TipoPagamento tipoPagamento;
		
		

	 
}
