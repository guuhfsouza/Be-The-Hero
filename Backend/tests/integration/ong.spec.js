const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () =>{
        await connection.migrate.rollback(); 
        ///para evitar que os dados de teste fiquem salvos, causando do banco limitar. Apenas para teste
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.destroy();
    })

    it('teste da criação de uma nova ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        //.set('authorization', 'inclui uma id valida') => processo para quando existe um valor enviado pelo header
        .send({
            name: "Vila Pet",
            email: "camilamanfio_83@hotmail.com",
            whatsapp: "18997960015",
            city: "Assis",
            uf: "SP"
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    }) 
})