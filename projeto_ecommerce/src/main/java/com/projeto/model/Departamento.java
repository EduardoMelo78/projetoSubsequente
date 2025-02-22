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
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departamento {

		@Id
		@GeneratedValue (strategy = GenerationType.IDENTITY)
		private int id;
		private String nome;
		private String descricao;
		
		@Lob
		@Column(columnDefinition = "LONGTEXT")
		private String logo;
		private String whatsapp;
		
		@OneToOne (cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
		@JoinColumn(name="usuario_id")
		private Usuario usuario;
}
