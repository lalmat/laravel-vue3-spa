/**
 * This is a simple script of mine to get rid of the axios dependancy.
 * Very low footprint, it use the _laravelToken if present in localStorage.
 */

export default {
  get(url)         { return this.doFetch('GET',    url); },
  post(url, data)  { return this.doFetch('POST',   url, data); },
  patch(url, data) { return this.doFetch('PATCH',  url, data); },
  put(url,data)    { return this.doFetch('PUT',    url, data); },
  delete(url)      { return this.doFetch('DELETE', url); },

  async doFetch(verb, url, data = null) {
    let headersBase = new Headers();
        headersBase.append("Content-Type",     "application/json");
        headersBase.append("Accept",           "application/json");
        headersBase.append("X-Requested-With", "XMLHttpRequest");

    let token = atob(localStorage.getItem('_laravelToken'));
    if (token)
      headersBase.append ("Authorization", `Bearer ${token}`);

    let response = await fetch(url, {
      method: verb,
      headers: headersBase,
      body: (data) ? JSON.stringify(data) : null
    });

    // check for error response
    if (!response.ok) {
      let body = await response.json();

      // Get error message from body or default to response status
      const error = {
        code    : response.status,
        message : body.message || 'Unkown error',
        errors  : body.errors || []
      }
      throw error;
    }

    return response.json();
  }
}

