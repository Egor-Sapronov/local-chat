import Perf from 'react-addons-perf';

const appPerf = {
  start() {
    Perf.start();
  },
  stop() {
    Perf.stop();
  },
  wasted() {
    Perf.printWasted(Perf.getLastMeasurements());
  },
  operations() {
    Perf.printOperations(Perf.getLastMeasurements());
  },
};

window.appPerf = appPerf;
