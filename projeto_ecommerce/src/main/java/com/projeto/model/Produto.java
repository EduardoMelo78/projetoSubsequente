package com.projeto.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor	
@AllArgsConstructor

public class Produto {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String descricao;
	private Double valor; 
	private int cashback;
	
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String foto;
	private int estoque;
	private java.util.Date data_cadastro;
	
	@ManyToOne (cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "departamento_id")
	private Departamento departamento;
}
