
interface ImpostoISS {
    valorTotal: number;
}

class ImpostoIssService {
    async impostoISS ({ valorTotal }: ImpostoISS) {
        
        return valorTotal * 0.05 ;
    
    }
}

export { ImpostoIssService };
