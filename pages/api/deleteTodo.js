import { table, getMinifiedRecord } from './utils/Airtable';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import ownsRecord from './middleware/OwnsRecord';
export default ownsRecord(async (req, res) => {
    const { id } = req.body;
    

    try {
        const deletedRecords = await table.destroy([id]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(deletedRecords[0]));
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});
