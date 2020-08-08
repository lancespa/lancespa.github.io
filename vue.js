new Vue({
    el: '#app',
  
    data: {
      streamers: [],
      filter: '',
      option: 'all'
    },
  
    beforeMount() {
      this.getTwitchStreamers();
    },
  
    methods: {
      getTwitchStreamers() {
        fetch('https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form')
          .then(raw => raw.json())
          .then(json => this.streamers = this.setStreamers(json))
          .catch(error => console.warn(error));
      },
  
      setStreamers(json) {
        const _tmp = json.filter(streamer => streamer.stream || streamer.display_name);
  
        return _tmp.map((streamer) => {
          if (streamer.stream) {
            const { display_name, status, logo, url } = streamer.stream;
  
            return { display_name, status, logo, url, active: true };
          }
  
          return {
            display_name: streamer.display_name,
            url: `https://www.twitch.tv/${streamer.display_name.toLowerCase()}`
          };
        });
      }
    },
  
    computed: {
      filteredStreamers() {
        return this.streamers.filter((streamer) => {
          let matches = true;
  
          if (this.filter !== '' && !streamer.display_name.toLowerCase().includes(this.filter.toLowerCase())) {
            matches = false;
          }
  
          if ((this.option === 'streaming' && !streamer.active) || (this.option === 'offline' && streamer.active)) {
            matches = false;
          }
  
          if (matches) return streamer;
        });
      }
    }
  });
  
  