import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const [Pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/').then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoASerEcluido: IPrato) => {
    http.delete(`pratos/${pratoASerEcluido.id}/`).then(() => {
      const listaPratos = Pratos.filter(
        (prato) => prato.id !== pratoASerEcluido.id
      );
      setPratos([...listaPratos]);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Exluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver imagem
                </a>
                ]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}/`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
