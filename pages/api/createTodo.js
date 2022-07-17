import { table, minifyRecords } from './utils/Airtable';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';


export default withApiAuthRequired (async (req, res) => {
    const { description } = req.body;
    const {user} = await getSession(req,res)
    try {
        const createdRecords = await table.create([
            { fields: { description,userId:user.sub }},
        ]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        };
        res.statusCode = 200;
        res.json(createdRecord);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});