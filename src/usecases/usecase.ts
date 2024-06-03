//a camada controller deve acessar a camada useCases atravez de um contrato

//pattern comand é o nome desse design pattern

//esa interface ser ausado pelo controller pra usar os use cases

//a funcao dessa interface é pra dizer qual dado deve ser usado pra executar o caso de uso e o que o caso de uso deve retornar
export interface UseCase<InputDto, OutputDto>{
    execute(input: InputDto): Promise<OutputDto>
}