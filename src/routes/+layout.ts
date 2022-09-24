import { redirect } from '@sveltejs/kit';
// export const csr = false; // comment out for live reloading
// export const prerender = true; // comment out for live reloading

export function load({ params }) {
    if ( params.slug === 'resume' ) {
        throw redirect(302, '/resume');
    }
}
