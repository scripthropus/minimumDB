import express from 'express';
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    const { name } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name }
        });
        res.json(user);
    } catch(error) {
        res.status(500).json({ error: 'ユーザーの作成に失敗しました'});
    }
});

app.get('/users', async (req, res) => {

    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: ' ユーザーの取得に失敗しました'});
    }
});

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});