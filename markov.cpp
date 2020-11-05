#include <algorithm>
#include <array>
#include <iostream>
#include <map>
#include <string>
#include <utility>
#include <locale.h>
#include <bits/stdc++.h>

using namespace std;

using PrevArr = vector<wchar_t>;

wchar_t generateNext(
    const PrevArr& arr,
    const map<PrevArr, map<int, wchar_t>>& next,
    const map<PrevArr, int>& totalCnt,
    mt19937& rnd
) {
    if (totalCnt.count(arr) == 0) {
        wcerr << wstring(arr.begin(), arr.end()) << " => 0\n";
        return 0;
    }
    int total = totalCnt.at(arr);
    const auto& it = next.at(arr).lower_bound(rnd() % total + 1);
    // assert(it != next.at(arr).end());
    return it->second;
}

wstring readAll() {
    wstring result;
    wchar_t c;
    while (wcin.get(c)) {
        result += c;
    }
    return result;
}

int main(int argc, const char *argv[]) {
    setlocale(LC_ALL, "C.UTF-8");

    int n = std::atoi(argv[1]);
    size_t maxLen = std::atoi(argv[2]);

    cerr << "N = " << n << "\n";
    cerr << "MAXLEN = " << maxLen << "\n";

    wstring base = readAll();

    cerr << "All read.\n";

    random_device rd;
    mt19937 gen(rd());

    map<PrevArr, map<wchar_t, int>> freqs;
    map<PrevArr, int> totalCnt;
    for (size_t i = n; i != base.size(); ++i) {
        PrevArr arr(base.begin() + i - n, base.begin() + i);
        ++freqs[arr][base[i]];
        ++totalCnt[arr];
    }

    cerr << "Freqs counted\n";

    map<PrevArr, map<int, wchar_t>> next;

    for (const auto& pair : freqs) {
        int cnt = 0;
        auto& nextMap = next[pair.first];
        for (const auto& freq : pair.second) {
            cnt += freq.second;
            nextMap[cnt] = freq.first;
        }
    }

    cerr << "Next counted\n";

    if (base.size() <= n) {
        cout << "too short text" << endl;
        return 1;
    }

    int pos = gen() % (base.size() - n) + n;

    PrevArr arr(base.begin() + pos - n, base.begin() + pos);
    for (wchar_t c : arr) {
        wcout << c;
    }

    wchar_t nextChar;
    int steps = 0;
    while ((nextChar = generateNext(arr, next, totalCnt, gen)) != 0 && ++steps < maxLen) {
        wcout << nextChar;
        rotate(arr.begin(), arr.begin() + 1, arr.end());
        arr.back() = nextChar;
    }
}
