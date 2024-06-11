import axios from 'axios';
import { NextResponse } from 'next/server'

export async function DELETE(req, res) {
    try {
        const classUserId = new URL(req.url).searchParams.get('id');
        const headers = {
            'Content-Type': 'application/json',
        };
        console.log("CLASSUSERID IN API ", classUserId)
        const url = `http://localhost:8000/api/classroom-users/${classUserId}`;

        const response = await axios.delete(url, { headers });
        console.log('Class deleted successfully:');
        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error deleting class:', error);
        return NextResponse.json({ data: response.data }, { status: 500 });
    }
}