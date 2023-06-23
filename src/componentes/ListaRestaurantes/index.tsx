import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

interface IParametroBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  useEffect(() => {
    //obter restaurante
    axios
      .get<IPaginacao<IRestaurante>>(
        'http://localhost:8000/api/v1/restaurantes/'
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const carregarDados = (URL: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(URL, opcoes)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const opcoes = {
      params: {} as IParametroBusca,
    };

    if (busca) {
      opcoes.params.search = busca;
    }

    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes);
  };

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form className={style.ListaRestaurantes__form} onSubmit={buscar}>
        <div>
          <input
            type="text"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Digite o nome ou id do restaurante"
          />
        </div>
        <div className={style.ListaRestaurantes__form__label}>
          <label htmlFor="select-ordenacao">Ordenação:</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>
        <button className={style.ListaRestaurantes__botao} type="submit">
          buscar
        </button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          className={style.ListaRestaurantes__botao}
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          className={style.ListaRestaurantes__botao}
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}
        >
          próxima página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
