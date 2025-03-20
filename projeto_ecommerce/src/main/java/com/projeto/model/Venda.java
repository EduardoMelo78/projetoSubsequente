package com.projeto.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor	
@AllArgsConstructor
public class Venda {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	private LocalDate data;
	private int quantidade;
	private Double valorTotal;
	
	@Enumerated(EnumType.STRING)
    private TipoPagamento tipoPagamento;
	
	@ManyToOne
	@JoinColumn (name = "usuario_id")
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
}
