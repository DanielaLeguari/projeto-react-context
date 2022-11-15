import { useContext, useState } from "react";
import { INovoUsuario, IPesquisarUsuario } from "../../utils/interfaces";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { toastConfig } from '../../utils/toast';
import MenuLateral from '../../components/MenuLateral';
import Conteudo from '../../components/Conteudo';
import Tabela from '../../components/TabelaUsuarios';

export const Pesquisa = () => {
    const { register, handleSubmit} = useForm<INovoUsuario>();
    const [usuarios, setUsuarios] = useState<Array<INovoUsuario>>([]);
    const {  pesquisarUsuario } = useContext(UserContext);
    const cabecalho = ["Nome", "CPF", "RG", "CNH", "Nome da mãe", "Nome do pai"
    , "Título de eleitor", "Sexo", "Ações"];
    
    const carregaUsuario = async (cpf : string) => {
        let u = await pesquisarUsuario(cpf);
        setUsuarios([u]);

        if (!u) {
            toast.error("Usuário não encontrado.", toastConfig);
        }
    }

    //pesquisar por cpf
    const processaForm = async (data:IPesquisarUsuario) => {
        await carregaUsuario(data.cpf);
    }

    return (
        <>
            <MenuLateral />
            <Conteudo>
                <h2>Pesquisar por CPF</h2>
                <form onSubmit={handleSubmit(processaForm)}>
                    <label htmlFor="">Digite o CPF:</label>
                    <input type="number" {...register("cpf")}/>
                    <input type="submit" value="Encontrar" />
                </form>
                <Tabela cabecalho={cabecalho} dados={usuarios} />
                
            </Conteudo>
        </>
    )
}