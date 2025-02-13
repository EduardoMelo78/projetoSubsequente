package com.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Integer> {

}
