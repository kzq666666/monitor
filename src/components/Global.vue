<script>
    const url = 'http://139.199.66.15:8000';
    const headers = {
        headers:{'Authorization':window.sessionStorage.token}
    };
    export default{
        url,
        headers,
    }
</script>