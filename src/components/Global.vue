<script>
    const url = 'http://127.0.0.1:8000';
    const headers = {
        headers:{'Authorization':window.sessionStorage.token}
    };
    export default{
        url,
        headers,
    }
</script>